# Gulp Templating

### Breakpoints

- sm: 576px;
- md: 768px;
- lg: 992px;
- xl: 1200px;

### Media Queries

```css
.element {
  @include screen(sm) {
      width: 20%;
  }
  @include screen(md) {
    width: 40%;
  }
  @include screen(lg) {
    width: 60%;
  }
  @include screen(xl) {
    width: 80%;
  }
}
```
