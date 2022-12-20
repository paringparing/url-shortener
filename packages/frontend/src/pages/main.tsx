import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { FormEvent } from 'react'
import { LoadingButton } from '@mui/lab'
import { api } from '../api'
import { UrlCreateResponse } from '../types'

export const MainPage: React.FC = () => {
  const [url, setUrl] = React.useState('')

  const [processing, setProcessing] = React.useState(false)

  const [error, setError] = React.useState<string | null>(null)

  const [createdSlug, setCreatedSlug] = React.useState<string | null>(null)

  const shortenedUrl = React.useMemo(() => {
    if (!createdSlug) return ''

    return `${window.location.protocol}//${window.location.host}/${createdSlug}`
  }, [createdSlug])

  const onSubmit = React.useCallback(
    async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      setProcessing(true)
      setError(null)

      try {
        const { data } = await api.post<UrlCreateResponse>('/urls', { url })

        setCreatedSlug(data.slug)
      } catch (e) {
        setError(`URL 단축 실패: ${e}`)
      } finally {
        setProcessing(false)
      }
    },
    [url],
  )

  return (
    <Box>
      <Dialog open={!!createdSlug} fullWidth maxWidth="xs">
        <DialogTitle>URL 단축이 완료되었습니다</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            label="단축된 URL"
            InputProps={{
              readOnly: true,
              onClick: (e) => {
                ;(e.target as HTMLInputElement).select()
              },
            }}
            value={shortenedUrl}
          />
          <Button
            sx={{ mt: 2 }}
            onClick={() => setCreatedSlug(null)}
            fullWidth
            variant="contained"
            disableElevation
          >
            닫기
          </Button>
        </DialogContent>
      </Dialog>
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
              disabled={processing}
              sx={{ flexGrow: 1 }}
              label="단축할 URL을 입력해 주세요."
            />
            <LoadingButton
              type="submit"
              variant="contained"
              disableElevation
              loading={processing}
              sx={{ px: 3 }}
            >
              단축하기
            </LoadingButton>
          </Stack>
          {error && (
            <Alert sx={{ mt: 2 }} severity="error">
              {error}
            </Alert>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
