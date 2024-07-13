const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('compile-scss', function() {
  return gulp.src('src/**/*.scss') // Указываем путь к SCSS файлам в разных каталогах
    .pipe(sass()) // Компилируем SCSS в CSS
    .pipe(gulp.dest('dist')); // Сохраняем скомпилированные CSS файлы в папку dist
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', gulp.series('compile-scss')); // Отслеживаем изменения в SCSS файлах и компилируем их при необходимости
});

gulp.task('default', gulp.series('compile-scss', 'watch')); // Запускаем компиляцию SCSS файлов и отслеживание изменений при запуске Gulp