gulp = require("gulp")
coffee = require("gulp-coffee") # 编译coffee
gutil = require "gulp-util" # 一个工具库
plumber = require "gulp-plumber" # 自动处理全部错误信息防止因为错误而导致 watch 不正常工作

# 错误处理
handleError = (err) ->
  gutil.beep()
  gutil.log err.toString()

# 各种资源的路径
coffee_src = "public/coffee/*.coffee"
coffee_dest = "public/javascripts"

# 生成 js
gulp.task "coffee", ->
  gulp.src coffee_src
  .pipe plumber(errorHandler: handleError)
  .pipe coffee() # 编译 coffee
  .pipe gulp.dest(coffee_dest)

gulp.task "default", ["coffee"]