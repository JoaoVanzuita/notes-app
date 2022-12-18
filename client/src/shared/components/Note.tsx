import { useState } from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Note } from '../types'

type TNoteProps = {
  noteId?: number
  noteTitle?: string
  noteDescription?: string
  noteUpdatedAt?: Date
  onClickButtonSave: (note: Note) => Promise<void>
  onClickButtonDelete: () => void
}

export const NoteCard: React.FC<TNoteProps> = ({
  noteId,
  noteTitle,
  noteDescription,
  noteUpdatedAt,
  onClickButtonSave,
  onClickButtonDelete
}) => {

  const [id, setId] = useState(noteId ?? 0)
  const [title, setTitle] = useState(noteTitle ?? '')
  const [description, setDescription] = useState(noteDescription ?? '')
  const [updatedAt, setUpdatedAt] = useState<Date>(noteUpdatedAt ?? new Date())

  const handleSave = () => {
    onClickButtonSave({id, title, description, updatedAt})
  }

  return (
    <Box width={400} padding={4}>
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

            {updatedAt && <Box textAlign='end'>

              <Typography variant='subtitle1'>
                {updatedAt.toLocaleDateString()}
              </Typography>
            </Box>}

          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}