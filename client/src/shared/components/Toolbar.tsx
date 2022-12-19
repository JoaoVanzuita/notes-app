import { Box, Button, Icon, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

interface IToolbarProps {
  textSearch?:string

  showSearchInput?:boolean
  showButtonSave?: boolean
  showButtonNew?: boolean
  showButtonDelete?: boolean
  showButtonManageAccount?: boolean
  showButtonBack?: boolean
  showButtonExit?: boolean

  onChangeTextSearch?: (newText: string) => void
  onClickButtonSave?: () => void
  onClickButtonNew?: () => void
  onClickButtonDelete?: () => void
  onClickButtonManageAccount?: () => void
  onClickButtonBack?: () => void
  onClickButtonExit?: () => void
}

export const Toolbar: React.FC<IToolbarProps> = ({
  textSearch,

  showSearchInput = false,
  showButtonSave = false,
  showButtonNew = false,
  showButtonDelete = false,
  showButtonManageAccount = false,
  showButtonBack = false,
  showButtonExit = false,

  onChangeTextSearch,
  onClickButtonSave,
  onClickButtonNew,
  onClickButtonDelete,
  onClickButtonManageAccount,
  onClickButtonBack,
  onClickButtonExit,

}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'

  return(
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      justifyContent='space-between'
      component={Paper}
    >

      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >
        {showSearchInput && <TextField
          size='small'
          label={smDown ? 'Pesquisar' : 'Pesquisar por título'}
          value={textSearch}
          onChange={ev => onChangeTextSearch?.(ev.currentTarget.value)}
        />}

        {showButtonSave && <Button
          variant='contained'
          color='primary'
          onClick={onClickButtonSave}
          disableElevation
          startIcon={<Icon>save</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>

        </Button>}

        {showButtonNew && <Button variant={showButtonSave ? 'outlined' : 'contained'}
          color='primary'
          onClick={onClickButtonNew}
          disableElevation
          startIcon={<Icon>add</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            nova nota
          </Typography>

        </Button>}

        {showButtonDelete && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonDelete}
          disableElevation
          startIcon={<Icon>delete</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Excluir conta
          </Typography>

        </Button>}


        {showButtonManageAccount && <Button
          variant='outlined'
          color='primary'
          onClick={onClickButtonManageAccount}
          disableElevation
          startIcon={<Icon>manage_accounts</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            conta
          </Typography>

        </Button>}

      </Box>

      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >

        {showButtonExit && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonExit}
          disableElevation
          startIcon={<Icon>logout</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            sair
          </Typography>

        </Button>}

        {(!smDown && showButtonBack) && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonBack}
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            voltar
          </Typography>

        </Button>}

      </Box>

    </Box>
  )
}