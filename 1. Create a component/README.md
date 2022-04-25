# Command line to create new component!

1. In terminal use ng generate(g) component(c):

```
ng g c component-name
```

Inside src/app/component-name/:

- component-name.component.css file -> Storing stylesheet for this component
- component-name.component.css file -> Storing the template
- component-name.component.css file -> Writing unit test
- component-name.component.css file -> Component itself
  Update app.module.ts and register the component in declarations array.

Additional, for generate a service(s):

```
ng g s service-name
```

Inside src/app/:

- service-name.service.spec.ts -> Includes some boiler plate code for writing unit test
- service-name.service.ts -> Plain ts service file with injectable(dependencies in constructor) decorator.
