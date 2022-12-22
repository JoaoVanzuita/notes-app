import { Alert, CircularProgress, Grid, Snackbar, Typography, useTheme } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NoteCard } from '../shared/components/Note'
import { Toolbar } from '../shared/components/Toolbar'
import { useAuthContext } from '../shared/contexts/auth/AuthContext'
import { useDebounce } from '../shared/hooks'
import { BasePageLayout } from '../shared/layouts/BasePageLayout'
import { ResponseError } from '../shared/services/api/errors'
import { NotesService } from '../shared/services/api/notes'
import { Note } from '../shared/types'
import Swal from 'sweetalert2'
import { v4 as uuid } from 'uuid'

export const Home = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { debounce } = useDebounce()
  const { signout } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [ successAlertMessage, setSuccessAlertMessage] = useState('')

  const showAlertDialog = (error: ResponseError) => {
    Swal.fire({
      titleText: `Ocorreu um erro - Código: ${error.statusCode}`,
      text: error.message,
      icon: 'error',
      background: alertBackground,
      color: alertColor
    })
  }

  const fetchNotes = async () =>{

    const result = await NotesService.getByTitle(search)

    if(result instanceof ResponseError){

      showAlertDialog(result)

      setNotes([])
      return
    }

    setNotes(result)
  }

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      setIsLoading(true)
      setNotes([])

      NotesService.getByTitle(search)
        .then((result) => {
          setIsLoading(false)

          if(result instanceof ResponseError){

            showAlertDialog(result)

            setNotes([])
            return
          }
          setNotes(result)
        })
    })
  }, [search])

  const handleNewNote = async () => {

    const newNote: Note = {
      id: uuid(),
      title: '',
      description: '',
      updatedOn: new Date(),
    }

    setNotes([...notes, newNote])
  }

  const handleDelete = async (id: string) => {

    await Swal.fire({
      titleText: 'Tem certeza de que deseja excluir essa nota?',
      text: 'Ela será perdida para sempre!',
      icon: 'warning',
      background: alertBackground,
      color: alertColor,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Excluir'
    }).then(async (result) => {

      if(result.isConfirmed){

        const filteredNotes = notes.filter(note => note.id !== id)

        setNotes(filteredNotes)

        const isSaved = await NotesService.getById(id)

        if(isSaved){

          const resultDelete = await NotesService.deleteById(id)

          if(resultDelete){

            showAlertDialog(resultDelete)

            fetchNotes()
          }
        }
      }
    })

    setSuccessAlertMessage('Nota excluída com sucesso!')
    setShowSuccessAlert(true)
  }

  const handleSave = async (note: Note) => {

    const result = await NotesService.save(note)

    if(result){

      showAlertDialog(result)

      return
    }

    setSuccessAlertMessage('Nota salva com sucesso!')
    setShowSuccessAlert(true)
    fetchNotes()
  }

  const handleExit = useCallback(async () => {
    const result = await signout()

    if(result){

      showAlertDialog(result)

      return
    }

    setSearchParams('')
    navigate('/login')
  }, [])

  return(
    <BasePageLayout
      title='Minhas notas'
      toolbar={<Toolbar
        showButtonManageAccount
        showButtonNew
        showSearchInput
        showButtonExit

        textSearch={search}

        onClickButtonExit={handleExit}
        onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
        onClickButtonNew={handleNewNote}
        onClickButtonManageAccount={() => navigate('/manage-account')}
      />}
    >
      <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={() => setShowSuccessAlert(false)}>
        <Alert variant='outlined' onClose={() => setShowSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
          {successAlertMessage}
        </Alert>
      </Snackbar>
      <Grid container display='flex' alignItems='center' justifyContent='center'>

        {isLoading && <CircularProgress/>}
        {!isLoading && notes.length == 0 &&
          <Typography variant='h5'>
            Nenhuma nota encontrada
          </Typography>
        }

        {notes.map(note =>(

          <Grid key={Math.random()} item>
            <NoteCard
              noteId={note.id}
              noteTitle={note.title}
              noteDescription={note.description}
              noteUpdatedOn={note.updatedOn}
              onClickButtonSave={handleSave}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onClickButtonDelete={() => handleDelete(note.id!)}
            />
          </Grid>

        ))}

      </Grid>
    </BasePageLayout>
  )
}