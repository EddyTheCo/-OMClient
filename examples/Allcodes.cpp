#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);

  QQmlApplicationEngine engine;

  engine.addImportPath("qrc:/esterVtech.com/imports");

  engine.loadFromModule("ExamplesAllcodes", "Allcodes");
  return app.exec();
}
