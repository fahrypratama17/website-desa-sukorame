import * as FiIcons from 'react-icons/fi';
import * as Fa6Icons from 'react-icons/fa6';
import { IconBaseProps } from 'react-icons';

interface DynamicIconProps extends IconBaseProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  let IconComponent: any = null;

  if (name?.startsWith('Fi')) {
    IconComponent = (FiIcons as any)[name];
  } else if (name?.startsWith('Fa')) {
    IconComponent = (Fa6Icons as any)[name];
  }

  if (!IconComponent) {
    // Return a default icon if not found, or null
    return <FiIcons.FiCircle {...props} />;
  }

  return <IconComponent {...props} />;
}
