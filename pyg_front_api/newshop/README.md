# newshop-backend

## Docs

- https://documenter.getpostman.com/view/130308/newshop/RVncfwwX

## Develp

1. 修改 `config/database.php` 中的数据库配置
2. 双击运行 start.cmd

## Deploy

```shell
$ sudo ln -s /var/www/ns-api.uieee.com/ns-api.uieee.com.conf /etc/nginx/sites-available/ns-api.uieee.com.conf
$ sudo ln -s /etc/nginx/sites-available/ns-api.uieee.com.conf /etc/nginx/sites-enabled/ns-api.uieee.com.conf
$ sudo rm -rf /etc/nginx/sites-enabled/default
$ sudo rm -rf /etc/nginx/sites-available/default
$ sudo systemctl reload nginx
```
