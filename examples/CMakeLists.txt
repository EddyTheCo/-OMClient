if(USE_QML AND BUILD_EXAMPLES)
	include(InstallRequiredSystemLibraries)
	foreach(example "Allcodes" "OMClientApp")
    
		qt_add_executable(${example} ${example}.cpp)

    qt6_add_qml_module(
      ${example}
      URI
      Examples${example}
      VERSION
      1.0
      QML_FILES
      "qml/${example}.qml"
      RESOURCE_PREFIX
      "/esterVtech.com/imports"
      IMPORT_PATH
      ${CMAKE_BINARY_DIR})

	target_link_libraries(${example} PRIVATE OMClient
		$<$<STREQUAL:$<TARGET_PROPERTY:OMClient,TYPE>,STATIC_LIBRARY>:OMClientplugin>
		)

	set_target_properties(${example} PROPERTIES
		WIN32_EXECUTABLE ON
		MACOSX_BUNDLE ON
		)
    install(
      TARGETS ${example}
      COMPONENT ${PROJECT_NAME}-examples
      BUNDLE DESTINATION . COMPONENT ${PROJECT_NAME}-examples
      LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
              COMPONENT ${PROJECT_NAME}-examples)
    if(QTDEPLOY AND NOT ANDROID AND NOT EMSCRIPTEN)
      qt_generate_deploy_qml_app_script(TARGET ${example} OUTPUT_SCRIPT
                                        deploy_script)
      install(SCRIPT ${deploy_script} COMPONENT ${PROJECT_NAME}-examples)
    endif(QTDEPLOY AND NOT ANDROID AND NOT EMSCRIPTEN)
    if(ANDROID)
      set_property(
        TARGET ${example}
        APPEND
        PROPERTY QT_ANDROID_MIN_SDK_VERSION 30)
      set_property(
        TARGET ${example}
        APPEND
        PROPERTY QT_ANDROID_TARGET_SDK_VERSION 34)
      set_property(
        TARGET ${example}
        APPEND
        PROPERTY QT_ANDROID_SDK_BUILD_TOOLS_REVISION 34.0.0)

    endif(ANDROID)
  endforeach()
endif(USE_QML AND BUILD_EXAMPLES)
