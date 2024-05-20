import styled from 'styled-components';

const Page = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  color: white;
`

function App() {
  return (
    <Page>
      <Title>Nasa Neo Asteroïds</Title>

    </Page>
  );
}

export default App;
