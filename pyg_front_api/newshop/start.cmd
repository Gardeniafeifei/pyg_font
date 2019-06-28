:: 将 PHP 添加到 Path 变量中
set PATH=%PATH%;%CD%\php;

:: 尝试用命令输出 PHP 版本号
php --version

:: 没有问题，则启动服务
php think run
