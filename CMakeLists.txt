cmake_minimum_required(VERSION 3.24)

option(USE_QML "Create QML types and modules" ON)
option(BUILD_EXAMPLES "Build the examples" ON)
option(QTDEPLOY "Deploy Qt dependencies for examples" ON)
option(BUILD_DOCS "Build documentation" ON)

include(${CMAKE_CURRENT_BINARY_DIR}/local_conf.cmake OPTIONAL)

include(FetchContent)
FetchContent_Declare(
	ccommon
	GIT_REPOSITORY https://github.com/EddyTheCo/Common.git
	GIT_TAG v0.5.1
	)
FetchContent_MakeAvailable(ccommon)
version_from_git(
	LOG       OFF
	TIMESTAMP "%Y%m%d%H%M%S"
	)
	project(EstervOpenMeteo VERSION ${VERSION} DESCRIPTION "OpenMeteo client library" LANGUAGES CXX)


set_property(GLOBAL PROPERTY USE_FOLDERS ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)
include(GNUInstallDirs)

find_package(Qt6 COMPONENTS Core Network )
if(USE_QML)
	find_package(Qt6 COMPONENTS Core Network Gui Quick ShaderTools)
endif(USE_QML)

if (Qt6_FOUND)
	qt_standard_project_setup()
	add_library(OMClient  src/o_m_client.cpp include/esterv/utils/o_m_client.hpp)
	if(USE_QML)
		qt6_add_qml_module(OMClient
			URI  Esterv.CustomControls.OpenMeteo
			VERSION 1.0
			QML_FILES
			"qml/CurrentWeather.qml"
			RESOURCE_PREFIX
			"/esterVtech.com/imports"
			RESOURCES
			"fonts/Mukta/Mukta-Bold.ttf"
			"fonts/Mukta/Mukta-ExtraLight.ttf"
			OUTPUT_TARGETS out_targets_var
			OUTPUT_DIRECTORY
			${CMAKE_BINARY_DIR}/Esterv/CustomControls/OpenMeteo
			IMPORT_PATH ${CMAKE_BINARY_DIR}
			)
			add_library(Esterv::OMClientplugin ALIAS OMClientplugin)
		target_compile_definitions(OMClient PRIVATE USE_QML)
    target_include_directories(
      OMClient PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include/esterv/utils)
		qt6_add_shaders(OMClient "esterVtech.com.imports.OMClient.shaders"
			BATCHABLE
			PRECOMPILE
			OPTIMIZED
			OUTPUT_TARGETS out_targets_var2
			PREFIX
			"/esterVtech.com/imports/Designs"
			FILES
			"frag/code3.frag"
			"frag/code2Am1.frag"
			"frag/code2Am0.frag"
			"frag/code1Am1.frag"
			"frag/code1Am0.frag"
			"frag/code0Am1.frag"
			"frag/code0Am0.frag"
                        "frag/code45Am1.frag"
                        "frag/code45Am0.frag"
			)

		target_link_libraries(OMClient PUBLIC Qt6::Gui Qt6::Quick)

		install(TARGETS ${out_targets_var} ${out_targets_var2}
			EXPORT ${PROJECT_NAME}-config
			DESTINATION ${CMAKE_INSTALL_LIBDIR}
      COMPONENT ${PROJECT_NAME}-qml
      RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
              COMPONENT ${PROJECT_NAME}-qml)
		install(DIRECTORY ${CMAKE_BINARY_DIR}/Esterv/CustomControls/OpenMeteo
			DESTINATION ${CMAKE_INSTALL_LIBDIR}/Esterv/CustomControls
      COMPONENT ${PROJECT_NAME}-qml)
		install(TARGETS OMClientplugin
			EXPORT ${PROJECT_NAME}-config
			DESTINATION ${CMAKE_INSTALL_LIBDIR}/Esterv/CustomControls/OpenMeteo
      COMPONENT ${PROJECT_NAME}-qml
      RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
              COMPONENT ${PROJECT_NAME}-qml)
	endif(USE_QML)
	add_library(Esterv::OMClient ALIAS OMClient)
	target_link_libraries(OMClient PUBLIC Qt6::Core Qt6::Network)

	target_include_directories(OMClient PUBLIC $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
		"$<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>")

	target_compile_definitions(OMClient PRIVATE WINDOWS_OMClient)

	install(TARGETS OMClient
		EXPORT ${PROJECT_NAME}-config
		DESTINATION ${CMAKE_INSTALL_LIBDIR}
    COMPONENT ${PROJECT_NAME}
    RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}" COMPONENT ${PROJECT_NAME})
  install(
    DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/include/
    DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}
    COMPONENT ${PROJECT_NAME}-dev)

	build_exports()
	if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
		add_subdirectory(examples)
		build_cpack()
	endif(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)

endif(Qt6_FOUND)

if(BUILD_DOCS)
	build_docs()
endif(BUILD_DOCS)
