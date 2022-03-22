import Image from 'next/image';
import { FC, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  setChecked,
  id,
  outerClassName,
}) => {
  const hiddenCheckboxRef = useRef<HTMLInputElement>(null);

  const onVisibleCheckboxClick = () => {
    hiddenCheckboxRef?.current?.click();
  };

  return (
    <div
      className={`flex items-center gap-[11px] ${outerClassName}`}
      data-testid="checkbox-outer-container"
    >
      <Image
        role="checkbox"
        src={`/icons/checkbox-${checked ? 'checked' : 'unchecked'}.svg`}
        alt="Checkbox"
        width="24px"
        height="24px"
        onClick={onVisibleCheckboxClick}
        className="hover:cursor-pointer"
      />
      <label htmlFor={id} className="text-base font-medium text-indigoGray-70">
        {label}
      </label>
      <input
        data-testid="Hidden Checkbox"
        ref={hiddenCheckboxRef}
        type="checkbox"
        hidden
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        id={id}
      />
    </div>
  );
};