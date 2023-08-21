import Container from "react-bootstrap/esm/Container"

export default function Nav(props) {

  return (
    <header className='bg-success text-white p-4'>
      <Container className="d-flex justify-content-between align-items-center">
        <h1 className='fw-bold m-0'>Spotify Analyzer</h1>
        {props.user && (
          <p className="text-end m-0 fw-semibold">Logged in as <br/> <strong>{props.user}</strong></p>
        )}
      </Container>
    </header>
  )
}