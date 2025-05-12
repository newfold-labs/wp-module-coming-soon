<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress Coming Soon Module
[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-module-coming-soon?color=21a0ed&labelColor=333333)](https://github.com/newfold/wp-module-coming-soon/releases)
[![License](https://img.shields.io/github/license/newfold-labs/wp-module-coming-soon?labelColor=333333&color=666666)](https://raw.githubusercontent.com/newfold-labs/wp-module-coming-soon/master/LICENSE)

Coming Soon functionality for WordPress.

## Module Responsibilities

- Show a coming soon page when a site isn't quite to launch. This page is branded differently per brand plugin.
- Exposes a toggle where users can launch/unlaunch their website.
- When JetPack subscriptions are enabled, the coming soon page will show an email subscription form on the coming soon page.
- When Coming Soon is enabled, a banner is shown to logged-in users to let them know that what they see isn't what non-logged-in users see.
- Shows a site status indicator on the WP Admin bar. Shows LIVE vs NOT LIVE.
- On WP admin pages, when coming soon is enabled, an admin notice shows that will guide the user to the toggle.
- On the brand plugin homepage, if the site is not live, it shows a notice with a button to launch the site.
- Exposes a class on the dependency injection container that allows other modules to enable, disable, and check status of Coming Soon.
- Exposes actions to other modules that may need to listen for changes coming soon.

## Critical Paths

- If a user enabled coming soon, it should show the coming soon page.
- If a user disables coming soon, it should not show the coming soon page.

## Releases

Run the `Newfold Prepare Release` github action to automatically bump the version (either patch, minor or major version), and update build and language files all at once. It will create a PR with changed files for review. Using this workflow, we can skip all the manual steps below.

### Manual Release

1. Update the module versions in the `bootstrap.php` file (the NFD_COMING_SOON_MODULE_VERSION const) and in the `package.json` file (the package version).

2. Build: Run `npm run build` to rebuild files (be sure to remove the old version files).

3. Update language files: Run `composer run i18n`.

4. Commit the updated and new build/language files.

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
    'admin_screen_id' => 'app',
    'admin_app_url'   => admin_url( 'admin.php?page=app#/home' ),
    'template_h1'     => __('Coming Soon!', 'text-domain'),
    ...
 ]);
 // assign container
 setContainer( $nfd_module_container );
 ```

### 4. API
The module offers the ability to check the status of the coming soon, enable the coming soon or disable the coming soon.

For PHP applications, you can use its container service provider to interact with the API.

#### Container Service Provider Usage
```php
use NewfoldLabs\WP\ModuleLoader\Container;

// Check if coming soon is enabled
public function check_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        return $comingSoonService->is_enabled();
    }
}

// Enable coming soon
public function enable_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        $comingSoonService->enable();
    }
}

// Disable coming soon
public function disable_coming_soon() {
    if ( $this->container->has( 'comingSoon' ) ) {
        $comingSoonService = $this->container->get( 'comingSoon' );
        $comingSoonService->disable();
    }
}
```

For JavaScript applications, you can use `NewfoldRuntime.comingSoon` window object to interact with the API.

The object exposes three asynchronous methods:
1. `isEnable`: Checks the current state of the coming soon and returns a boolean value or null on error.
2. `enable`: Enables the coming soon. It will return an object containing two properties, `success` and `comingSoon.` 'success' is a boolean that indicates whether the operation succeeded or not. 'comingSoon' is also a boolean with the new value. If the operation does not succeed, the object will not contain a 'comingSoon' property.
3. `disable`: Disables the coming soon. It will return an object containing two properties, `success` and `comingSoon.` 'success' is a boolean that indicates whether the operation succeeded or not. 'comingSoon' is also a boolean with the new value. If the operation does not succeed, the object will not contain a 'comingSoon' property.

All three methods are asynchronous, so keep that in mind when calling them.

#### Window API (JavaScript) Usage
```JavaScript
await NewfoldRuntime.comingSoon.isEnabled();
await NewfoldRuntime.comingSoon.enable();
await NewfoldRuntime.comingSoon.disable();

[More on Newfold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)
