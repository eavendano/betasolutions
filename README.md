# Beta Solutions Tech

---

## Prueba Teorica

- ¿Puede usar GET en lugar de PUT para crear un nuevo recurso, por qué o por qué no? 
  - Como el verbo lo indíca, el GET es una operación que debería de favorecer la lectura en lugar de la escritura. La
    razón para no usar GET como metodo de creación o actualización de recursos o entidades es por un tema de seguridad,
    se tiene mucho más control sobre la entrada, bodies, headers e inclusive la exposición del mismo endpoint ya que no
    está expuesta a herramientas comunes como un navegador de uso general.
- ¿Qué son pruebas de integración?
  - Son las pruebas que confirman el funcionamiento en conjunto de cada uno de los componentes de software implementados,
    para esto se requiere comprobar que las consultas o peticiones de los usuarios generen los resultados esperados. Son
    pruebas que comúnmente confirman los happy-paths y errores esperados para los clietes. Tienen la cualidad de que no
    prueban el 100% de los escenarios contrario a los unit tests debido a que no siempre se producen ciertos escenarios
    como una base de datos no disponible o revisar el 100% de las validaciones como nulos por ejemplo.
- ¿Cuál es la diferencia entre HTTP y HTTPS?
  - El nivel de seguridad, HTTP no necesariamente entiende de certificaciones ni tampoco "recuerda" clientes o llamadas
    previas o métodos de encripción. HTTPS por otro lado, si requiere que se especifiquen certificados válidos, algoritmos
    de encripción y desencripción, métodos de validación de usuarios entre otras características que aseguren una
    comunicación segura entre los clientes y el servidor.
- ¿Qué es un API y cuáles funciones tiene?
  - Un API es un Applicacion Programming Interface, y como sus siglas indican, es el contrato que los clientes pueden
    seguir para hacer consultas a un servidor. Respecto a las funciones, estas dependen del protocolo de comunicación y 
    la capacidad de la aplicación. Por ejemplo REST que funciona sobre el protocólo HTTP utiliza los verbos del último
    para poder diferenciar entre lectura, creación, actualización y borrado de recursos; por otra parte GraphQL tiene 
    solo 2 tipos de operaciones, queries y mutaciones que funcionan sobre el protocolo HTTP también. Entre las funciones
    esperadas de un API están las llamadas CRUD que son Create, Read Update and Delete que se esperan que se apliquen
    sobre un recurso o entidad determinado.
- ¿Qué es un commit y un rollback?
  - Un commit es el comando de versionamiento que nos asegura que va a registrar los cambios en el árbol intermedio de GIT
    y que no los vamos a perder, no verifica que dichos cambios tengan sentido lexicográficos o que estén correctos a
    cabalidad, inclusive puede tener cambios que generan conflicto con la versión más reciente. Un rollback o revert nos
    permite revertir cambios que por algún motivo técnico ya no son requeridos. Normalmente el revert elimina el cambio
    más reciente; sin embargo, hay varias formas de remover cambios aún más viejos.
- ¿Qué es un índice y cuáles tipos existen?
  - Un índice es una herramienta que nos permite acelerar las búsquedas de datos ya que son estructuras de datos que en
    su mayoría nos ayudan a prevenir escaneos secuenciales para acceder datos más rápido e inteligentemente. Normalmente,
    las estructuras que permiten esto son los árboles. Respecto a los tipos de índices que existen podemos encontrar los
    más comunes de clave única, es decir solamente un campo de la tabla es la llave que nos permite indexar, de clave múltiple
    cuando 2 o más valores son los que nos permiten buscar un valor específico, y entre los menos comunes tenemos los de
    clave repetida o duplicada que permiten mantener cuales valores utilizan la misma llave, y los índices de busqueda textual
    que tienen como llaves las palabras repetidas o trozos de tamaño de N caracteres (N-gramos) para poder buscar rápidamente
    campos o llaves con textos muy largos como descripciones, capítulos de libros entre otros.
- ¿Diferencia procedimiento almacenado y una función?
  - La diferencia es en ejecución y resultado. Los procedimientos almacenados se puede llamar de manera remota a la base
    de datos es decir, no se ocupa estar precisamente dentro de una terminal o instancia para poder invocarlos mientras
    que las funciones si y requieren estar dentro de contextos específicos para poder ser invocadas. La otra mayor
    diferencia es el resultado de la función, mientras que un procedimiento almacenado no está obligado a retornar un
    resultado, la función siempre retorna una variable. Por último las funciones normalmente solo pueden llamar otras
    funciones, mientras que los procedimientos almacenados pueden invocar funciones y otros procedimientos almacenados también.
- ¿Qué es un ORM?
  - Un Object Relational Mapping es una herramienta que permite mapear valores de tablas de bases de datos a objetos planos.
    En los lenguajes orientados a objetos son muy comunes y son muy recomendados como medida de seguridad contra inyecciones.
    El valor que tiene es que una vez que el mapeo ha finalizado, nos permite tener una abstracción de los datos almacenados
    en las bases de datos. El punto clave es la abstracción, si se tiene que migrar de una base de datos relacional a una
    no relacional, el impacto en el código se mantiene al mínimo, ya que esa abstracción se mantiene sin importar el formato
    o estilo de almacenamiento escogido para la aplicación y minimiza la posibilidad de refactorización, siempre y cuando
    el ORM sepa como hacer su trabajo.
- ¿Cómo encontrarías las consultas que más consumen en una aplicación?
  - De gusto personal primeramente me ayudaría de alguna herramienta de parseo de logs. Luego utilizaría un archivo de log
    en particular, el access log en el servidor y me aseguraría que en dicha configuración aparezca en el mensaje los
    tamaños de los requests y los responses enviados a los clientes. A partir de ahí usar algunas herramientas estadísticas
    como promedios, percentiles, outliers y sus relaciones para poder determinar cuales son las consultas que más consumen
    en la aplicación.