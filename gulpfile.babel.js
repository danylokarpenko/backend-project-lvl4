import gulp from 'gulp';
import container from './container';
import getServer from './';

gulp.task('console', () => {
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
});

gulp.task('server', (cb) => {
  const port = process.env.PORT || 4000;
  getServer().listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
  });
});

gulp.task('default', () => {
  console.log('default task')
});
