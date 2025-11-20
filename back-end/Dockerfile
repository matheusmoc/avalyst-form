# Dockerfile para back-end PHP
FROM php:8.1-apache

# Instala extensões necessárias
RUN docker-php-ext-install pdo pdo_mysql

# Instala o Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia o código do projeto
COPY . /var/www/html/

# Permite reescrita de URL
RUN a2enmod rewrite

# Permite permissões para pasta de logs, cache, etc
RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html

# Instala dependências PHP
RUN composer install

EXPOSE 80
