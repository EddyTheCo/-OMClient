# Esterv.Utils.OMClient

[TOC]

Implements  a client to communicate with the Open-Meteo REST API. 
The project creates  a custom QML module and types related with weather conditions.

## Dependencies

The repo depends on [Qt](https://doc.qt.io/) libraries.

## Configure, build, test, package ...
 
The project uses [CMake presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html) as a way to share CMake configurations.
Refer to [cmake](https://cmake.org/cmake/help/latest/manual/cmake.1.html), [ctest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) and [cpack](https://cmake.org/cmake/help/latest/manual/cpack.1.html) documentation for more information on the use of presets.

## Adding the libraries to your CMake project 

```CMake
include(FetchContent)
FetchContent_Declare(
	EstervOpenMeteo
	GIT_REPOSITORY https://github.com/EddyTheCo/Esterv.Utils.OMClient.git
	GIT_TAG vMAJOR.MINOR.PATCH 
	FIND_PACKAGE_ARGS MAJOR.MINOR CONFIG  
	)
FetchContent_MakeAvailable(EstervOpenMeteo)

target_link_libraries(<target> <PRIVATE|PUBLIC|INTERFACE> Esterv::OMClient)
```
If you want to use the QML module also add

```
target_link_libraries(<target> <PRIVATE|PUBLIC|INTERFACE> $<$<STREQUAL:$<TARGET_PROPERTY:Esterv::OMClient,TYPE>,STATIC_LIBRARY>:Esterv::OMClientplugin>)
```

## API reference

You can read the [API reference](https://eddytheco.github.io/Esterv.Utils.OMClient/), or generate it yourself like

```
cmake --workflow --preset default-documentation
```

## Using the QML modules

One needs to  make available to the QML engine the different modules by setting the [QML import path](https://doc.qt.io/qt-6/qtqml-syntax-imports.html#qml-import-path).

1. In your main function `engine.addImportPath("qrc:/esterVtech.com/imports");` to use the resource file. 

2. Set the environment variable like `export QML_IMPORT_PATH=installDir/CMAKE_INSTALL_LIBDIR`  where `CMAKE_INSTALL_LIBDIR` is where `Esterv` folder was created.

## Examples

The [examples](examples) folder shows the use of the different custom types provided by the QML module.

One can also play with the types [here](https://eddytheco.github.io/qmlonline/?example_url=omclient)


## Contributing

We appreciate any contribution!

Currently not all the weather codes are implemented, contribution to the shaders are highly appreciated. 
I find shaders very customizable, you can test  your new shaders contribution [here](https://www.shadertoy.com/view/csKyDz)

You can open an issue or request a feature.
You can open a PR to the `develop` branch and the CI/CD will take care of the rest.
Make sure to acknowledge your work, and ideas when contributing.
