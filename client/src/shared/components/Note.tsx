import { useState } from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Note } from '../types'

type TNoteProps = {
  noteId?: number
  noteTitle?: string
  noteDescription?: string
  noteUpdatedOn: Date
  onClickButtonSave: (note: Note) => Promise<void>
  onClickButtonDelete: () => void
}

export const NoteCard: React.FC<TNoteProps> = ({
  noteId,
  noteTitle,
  noteDescription,
  noteUpdatedOn,
  onClickButtonSave,
  onClickButtonDelete
}) => {

  const [id] = useState(noteId ?? 0)
  const [title, setTitle] = useState(noteTitle ?? '')
  const [description, setDescription] = useState(noteDescription ?? '')
  const [updatedOn] = useState<Date>(new Date(noteUpdatedOn))

  const handleSave = () => {
    onClickButtonSave({id, title, description, updatedOn: updatedOn})
  }

  return (
    <Box  padding={3}>
      <Card elevation={6}>
        <CardContent>
          <Box padding={1}>
            <TextField variant='standard' size='small' placeholder='Adicione um título...' fullWidth value={title} onChange={ev => setTitle(ev.currentTarget.value)} inputProps={{
              style: {
                borderWidth: '0px',
                textAlign: 'center',
                fontSize: 30
              }
            }}
            />
          </Box>
          <Box padding={1}>
            <TextField variant='outlined' placeholder='Adicione uma descrição...' fullWidth multiline rows={13} value={description} onChange={ev => setDescription(ev.currentTarget.value)}/>
          </Box>

          <Box paddingX={1} display='flex' alignItems='center' justifyContent='space-between'>

            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
              <Button
                onClick={handleSave}
                variant='contained'>
                Salvar
              </Button>
              <Button
                onClick={onClickButtonDelete}
                variant='outlined'>
                Excluir
              </Button>
            </Box>

            {updatedOn && <Box textAlign='end'>

              <Typography variant='subtitle1'>
                {updatedOn.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
              </Typography>
            </Box>}

          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}