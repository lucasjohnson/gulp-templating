# Gulp Templating

## Commands
- `gulp`
- `gulp build`

## Sass Mixins

### Media Queries
```css
.element {
  @include screen(sm) {} // > 576px
  @include screen(md) {} // > 768px
  @include screen(lg) {} // > 992px
  @include screen(xl) {} // > 1200px
}
```

### Centering
```css
.element {
  @include center(horizontal);
  @include center(verical);
  @include center(both);
}
```
