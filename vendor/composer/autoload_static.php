<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit0ac573645a47664728a1be3530dc4827
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Willi\\Clientes\\' => 15,
        ),
        'K' => 
        array (
            'Klein\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Willi\\Clientes\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Klein\\' => 
        array (
            0 => __DIR__ . '/..' . '/klein/klein/src/Klein',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit0ac573645a47664728a1be3530dc4827::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit0ac573645a47664728a1be3530dc4827::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit0ac573645a47664728a1be3530dc4827::$classMap;

        }, null, ClassLoader::class);
    }
}
