import { useState } from 'react'
import { Box, Button, Card, CardContent, Paper, TextField, Typography } from '@mui/material'

type TNoteProps = {
  noteId?: number
  noteTitle?: string
  noteDescription?: string
  noteUpdatedAt?: Date
}

export const NoteCard: React.FC<TNoteProps> = ({
  noteId,
  noteTitle,
  noteDescription,
  noteUpdatedAt
}) => {

  const [id, setId] = useState(noteId ?? 0)
  const [title, setTitle] = useState(noteTitle ?? '')
  const [description, setDescription] = useState(noteDescription ?? '')
  const [updatedAt, setUpdatedAt] = useState<Date | null>(noteUpdatedAt ?? null)

  return (
    <Box width={400} padding={4}>
      <Card elevation={6}>
        <CardContent>
          <Box padding={1}>
            <TextField variant='filled' size='small' placeholder='Adicione um título...' fullWidth value={title} onChange={ev => setTitle(ev.currentTarget.value)} inputProps={{
              style: {
                textAlign: 'center',
                fontSize: 30
              }
            }}/>
          </Box>
          <Box padding={1}>
            <TextField placeholder='Adicione uma descrição...' fullWidth multiline rows={13} value={description} onChange={ev => setDescription(ev.currentTarget.value)}/>
          </Box>

          <Box paddingX={1} display='flex' alignItems='center' justifyContent='space-between'>

            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
              <Button variant='contained'>
                Salvar
              </Button>
              <Button variant='outlined'>
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