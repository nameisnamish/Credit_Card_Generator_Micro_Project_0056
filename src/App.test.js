import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders form elements correctly', () => {
  render(<App />);
  expect(screen.getByLabelText(/CARDHOLDER NAME/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CARD NUMBER/i)).toBeInTheDocument();
  expect(screen.getByText(/EXP. DATE \(MM\/YY\)/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CVC/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
});

test('shows validation errors when submitting empty form', () => {
  render(<App />);
  const confirmButton = screen.getByRole('button', { name: /confirm/i });
  fireEvent.click(confirmButton);

  const errorMessages = screen.getAllByText(/can't be blank/i);
  expect(errorMessages.length).toBeGreaterThan(0);
});

test('submits successfully with valid input data', () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText(/CARDHOLDER NAME/i), { target: { value: 'Jane Appleseed' } });
  fireEvent.change(screen.getByLabelText(/CARD NUMBER/i), { target: { value: '1234567891230000' } });
  fireEvent.change(screen.getByPlaceholderText('MM'), { target: { value: '09' } });
  fireEvent.change(screen.getByPlaceholderText('YY'), { target: { value: '25' } });
  fireEvent.change(screen.getByLabelText(/CVC/i), { target: { value: '123' } });

  fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

  expect(screen.getByText(/THANK YOU!/i)).toBeInTheDocument();
  expect(screen.getByText(/Card details confirmed successfully!/i)).toBeInTheDocument();
});

test('auto-pads single digit month and year on blur and validates month range', () => {
  render(<App />);
  const monthInput = screen.getByPlaceholderText('MM');
  const yearInput = screen.getByPlaceholderText('YY');

  // Single digit month auto-pads to 02 on blur
  fireEvent.change(monthInput, { target: { value: '2' } });
  fireEvent.blur(monthInput);
  expect(monthInput.value).toBe('02');

  // Month higher than 12 caps to 12
  fireEvent.change(monthInput, { target: { value: '15' } });
  expect(monthInput.value).toBe('12');

  // Single digit year auto-pads to 09 on blur
  fireEvent.change(yearInput, { target: { value: '9' } });
  fireEvent.blur(yearInput);
  expect(yearInput.value).toBe('09');
});

