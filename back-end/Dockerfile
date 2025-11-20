FROM php:8.1-cli

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

RUN composer install

EXPOSE 8282

CMD ["php", "-S", "0.0.0.0:8282", "-t", "public"]