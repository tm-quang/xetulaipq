"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import { AdminButton } from './UI';

export function AdminModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md'
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[95vw]'
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={cn("relative transform overflow-hidden rounded-[32px] bg-white text-left shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all sm:my-8 w-full border border-white/20", sizes[size])}>
                <div className="bg-gradient-to-b from-gray-50/80 to-white px-8 pt-8 pb-6 border-b border-gray-100 flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-[22px] font-black text-gray-900 uppercase tracking-tight">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all hover:scale-105 active:scale-95"
                  >
                    <HiX size={22} className="stroke-[2]" />
                  </button>
                </div>
                <div className="px-8 py-8">
                  {children}
                </div>
                {footer && (
                  <div className="bg-gray-50/80 px-8 py-6 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3.5">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function AdminConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  variant = "danger"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'warning';
}) {
  return (
    <AdminModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      size="sm"
      footer={
        <>
          <AdminButton variant="ghost" onClick={onClose}>{cancelText}</AdminButton>
          <AdminButton variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>{confirmText}</AdminButton>
        </>
      }
    >
      <p className="text-[15px] font-bold text-gray-600 leading-relaxed">{message}</p>
    </AdminModal>
  );
}
