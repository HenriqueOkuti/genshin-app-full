import app, { init } from './app';

const port = +process.env.PORT || 8444;

init().then(() => {
  app.listen(port, () => {
    //console.clear();
    console.log(`Server is listening on port ${port}.`);
  });
});
