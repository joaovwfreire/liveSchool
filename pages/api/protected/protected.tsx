import Cookies from 'cookies'
import LitJsSdk from 'lit-js-sdk'

export default function Protected(props: any) {
  if (!props.authorized) {
    return (
      <h2>Unauthorized</h2>
    )
  }
  return (
    <div>
      <h2>Hello world, welcome to the community!</h2>
    </div>
  )
}

export async function getServerSideProps({ req, res, query }: any) {
  const { id } = query
  const cookies = new Cookies(req, res)
  const jwt = cookies.get('lit-auth')
  if (!jwt) {
    return {
      props: {
        authorized: false
      },
    }
  }

  const { verified, payload } = LitJsSdk.verifyJwt({ jwt })

  if (
    payload.baseUrl !== "process.env.BASE_DOMAIN"
    || payload.path !== '/protected'
    || payload.extraData !== id
  ) {
    return {
      props: {
        authorized: false
      },
    }
  }
  return {
    props: {
      authorized: verified ? true : false
    },
  }
}