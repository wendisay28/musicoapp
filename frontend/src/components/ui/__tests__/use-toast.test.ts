import { renderHook, act } from '@testing-library/react';
import { useToast } from '../use-toast';

describe('useToast', () => {
  it('shows toast with default options', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Title',
        description: 'Test Description',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Test Title',
      description: 'Test Description',
      variant: 'default',
    });
  });

  it('shows toast with custom variant', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Title',
        description: 'Test Description',
        variant: 'destructive',
      });
    });

    expect(result.current.toasts[0]).toMatchObject({
      variant: 'destructive',
    });
  });

  it('dismisses toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Title',
        description: 'Test Description',
      });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('dismisses all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Title 1',
        description: 'Test Description 1',
      });
      result.current.toast({
        title: 'Test Title 2',
        description: 'Test Description 2',
      });
    });

    expect(result.current.toasts).toHaveLength(2);

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts).toHaveLength(0);
  });
}); 