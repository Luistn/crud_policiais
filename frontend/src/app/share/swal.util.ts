import Swal, { SweetAlertIcon } from 'sweetalert2';

export function showSwal({
  title = '',
  text = '',
  icon = 'success',
  position = 'top-end',
  timer = 1500,
  showConfirmButton = false
}: {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  timer?: number;
  showConfirmButton?: boolean;
}) {
  Swal.fire({
    position,
    icon,
    title,
    text,
    showConfirmButton,
    timer
  });
}
