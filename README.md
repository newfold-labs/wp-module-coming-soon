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
 composer config repositories.newfold composer https://newfold-labs.github.io/satis/
 ```

### 2. Require the `newfold-labs/wp-module-coming-soon` package.

 ```bash
 composer require newfold-labs/wp-module-coming-soon
 ```
### 3. Set strings and other options via the `comingsoon` index in a [container](https://github.com/newfold-labs/wp-module-loader#container-container-).

 ```php
 use NewfoldLabs\WP\ModuleLoader\Container;
 use function NewfoldLabs\WP\ModuleLoader\container as setContainer;
 
 $nfd_module_container = new Container();
 
 // Set a value - scoped to comingsoon index
 $nfd_module_container->set('comingsoon', [
    'option_name'     => 'mm_coming_soon',
    'admin_screen_id' => 'app',
    'admin_app_url'   => admin_url( 'admin.php?page=app#/home' ),
    'template_h1'     => __('Coming Soon!', 'text-domain'),
    ...
 ]);
 // assign container
 setContainer( $nfd_module_container );
 ```

 ### 4. Interface
The module offers the ability to check the status of the coming soon, enable the coming soon and disable the coming soon.
You can interact with its interface either via its service provider through the container (for PHP) or its window API (for JavaScript):

#### Container (PHP)
```php
use NewfoldLabs\WP\ModuleLoader\Container;

public function check_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        return $comingSoonService->is_enabled();
    }
}

public function enable_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        $comingSoonService->enable();
    }
}

public function disable_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        $comingSoonService->disable();
    }
}
```

#### Window API (JavaScript)
```JavaScript
NewfoldRuntime.comingSoon.isEnabled();
NewfoldRuntime.comingSoon.enable();
NewfoldRuntime.comingSoon.disable();
```

[More on Newfold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)
