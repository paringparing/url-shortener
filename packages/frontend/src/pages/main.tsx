import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { FormEvent } from 'react'

export const MainPage: React.FC = () => {
  const [url, setUrl] = React.useState('')

  const onSubmit = React.useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }, [])

  return (
    <Box>
      <Container>
        <Stack
          sx={{ minHeight: '100vh', py: 8 }}
          direction="column"
          justifyContent="center"
        >
          <Typography variant="h2" textAlign="center" fontWeight={800}>
            URL 단축기
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            component="form"
            onSubmit={onSubmit}
          >
            <TextField
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
              sx={{ flexGrow: 1 }}
              label="단축할 URL을 입력해 주세요."
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{ px: 3 }}
            >
              단축하기
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
