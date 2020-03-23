import runServer from '../';

const port = 8080;

runServer().listen(port, () => {
  console.log(`Server has been started on port: ${port}`);
})
