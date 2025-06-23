# bstoast

A lightweight Bootstrap 5 toast notification library that provides a modern alternative to `alert()`.

## Installation

```bash
npm install bstoast
```

## Quick Start

```js
import { bstoast } from "https://cdn.jsdelivr.net/npm/bstoast";

// Simple usage
bstoast("Hello World!");

// Advanced usage with icon
bstoast({
  title: "Success",
  body: "Operation <strong>completed</strong>",
  color: "success",
  icon: "check-circle",
  timeout: 3000,
});
```

## Live Demo

Try out bstoast with our [live demo](https://prudhvi1709.github.io/bstoast/) which includes interactive examples and code snippets.

## API Reference

### `bstoast(options)`

Creates and displays a Bootstrap toast notification.

#### Parameters

| Option     | Type            | Default       | Description                                                                |
| ---------- | --------------- | ------------- | -------------------------------------------------------------------------- |
| `title`    | string          | "Alert"       | Toast header text (HTML allowed)                                           |
| `body`     | string          | required      | Toast message content (HTML allowed)                                       |
| `color`    | string          | "primary"     | Bootstrap color variant (primary, success, danger, warning, info)          |
| `append`   | boolean         | true          | If true, adds new toast to existing ones. If false, clears previous toasts |
| `timeout`  | number \| false | 5000          | Auto-hide delay in milliseconds. Set to false to disable auto-hide         |
| `icon`     | string          | undefined     | Bootstrap Icons class name (without 'bi-' prefix)                          |
| `position` | string          | 'top-0 end-0' | Bootstrap position classes for toast container                             |

#### Returns

- `void`

#### Throws

- `Error` if Bootstrap 5 is not loaded
- `Error` if body parameter is not provided

#### Example Usage

```js
// Simple string message
bstoast("Operation successful!");

// Full configuration with icon and position
bstoast({
  title: "Error",
  body: "Something went wrong",
  color: "danger",
  icon: "exclamation-triangle",
  append: true,
  timeout: 10000,
  position: "bottom-0 start-0", // Show toast at bottom start
});

// Disable auto-hide
bstoast({
  title: '<h2 class="h5">Important</h2>',
  body: "Please read this carefully",
  timeout: false,
});

// Using Bootstrap Icons
bstoast({
  title: "Info",
  body: "New update available",
  icon: "info-circle",
  color: "info",
});
```

## Requirements

- Bootstrap 5 JavaScript
- Bootstrap Icons (optional, for icon support)

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/prudhvi1709/bstoast.git
cd bstoast

# Install dependencies
npm install
```

### Available Scripts

```bash
# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Testing

The project uses [Vitest](https://vitest.dev/) for testing with [Happy DOM](https://github.com/capricorn86/happy-dom) for DOM environment simulation. The test suite covers:

- Basic toast creation and configuration
- Different positions and colors
- Custom icons and timeouts
- HTML escaping
- Error handling
- Edge cases

To run tests in watch mode:

```bash
npm test
```

To generate a coverage report:

```bash
npm run test:coverage
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

If you discover any security-related issues, please raise an issue in the issue tracker.

## Credits

- [Bootstrap](https://getbootstrap.com/) - For the toast component
- [Bootstrap Icons](https://icons.getbootstrap.com/) - For icon support
