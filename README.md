# Gulp Templating

### Breakpoints

- sm: 576px;
- md: 768px;
- lg: 992px;
- xl: 1200px;

### Media Queries Mixin Usage

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

### Centering Mixin Usage

```css
.element {
  @include center(both);
}
.foo-parent {
  position: relative;
}
```

### Font Mixin

```css
p {
  @include font(14px, 100, 1px, 1.5, null)
}
```
