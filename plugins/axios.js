export default function ({ $axios, redirect }) {
  $axios.setHeader('Accept-Currency', 'EUR')
  $axios.setHeader('Accept-Language', 'en-GB')

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
