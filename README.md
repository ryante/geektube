dxc采集发布出现：413 request entity too large
解决方案:
php.ini
post_max_size = 10M
upload_max_filesize = 8M

nginx.conf
client_max_body_size 30m;
(主要是设置这几个值，至于多少根据实际业务而定)
