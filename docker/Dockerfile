FROM httpd

WORKDIR /usr/local/apache2/htdocs
COPY webden/* ./

CMD apachectl -D FOREGROUND
EXPOSE 80