'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  NavigationMenu as NavigationMenuCn,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

export const NavigationMenu = () => {
  return (
    <NavigationMenuCn>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Users
          </Link>
          <Link to="/create" className={navigationMenuTriggerStyle()}>
            Create user
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuCn>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
