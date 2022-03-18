<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress Coming Soon Module
[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-module-coming-soon?color=21a0ed&labelColor=333333)](https://github.com/newfold/wp-module-coming-soon/releases)
[![License](https://img.shields.io/github/license/newfold-labs/wp-module-coming-soon?labelColor=333333&color=666666)](https://raw.githubusercontent.com/newfold-labs/wp-module-coming-soon/master/LICENSE)

Coming Soon functionality for WordPress.

## Installation

### 1. Add the Newfold Satis to your `composer.json`.

 ```bash
 composer config repositories.newfold composer https://newfold.github.io/satis
 ```

### 2. Require the `newfold-labs/wp-module-coming-soon` package.

 ```bash
 composer require newfold-labs/wp-module-coming-soon
 ```
### 3. Set strings and other defaults via container.

 ```php
 $container = new Container();
 // Set a value
 $container->set('comingsoon', [
 	'option_name' => 'mm_coming_soon',
 ]);
 ```

[More on NewFold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)