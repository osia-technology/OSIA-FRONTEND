import { AdminAvatar, StudentAvatar, SchoolOfficialAvatar } from 'src/assets/imagePath';

export const getHomePathByRole = (role: any) => {
  switch (role) {
    case 'admin':
      return 'admin/home';
    case 'student':
      return 'student/home';
    case 'school_official':
      return 'school_official/home';
    default: 
      return 'admin/home';
  }
};

export const getUserAvatar = (role: any) => {
  switch (role) {
    case 'admin':
      return AdminAvatar;
    case 'school_official':
      return SchoolOfficialAvatar;
    case 'student':
      return StudentAvatar;
    default : 
      return AdminAvatar;
  }
};

/**
 * Capitalize the first letter of each word in a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeWords(str: string): string {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
 * Format a date to a readable string in French format (dd/mm/yyyy).
 * @param date - The date to format.
 * @returns A formatted date string in dd/mm/yyyy format.
 */
export function formatDateFr(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
 * Generate a secure random string of a given length.
 * @param length - The length of the string to generate.
 * @returns A secure random string.
 */
export function generateSecureRandomString(length: number): string {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(array, byte => characters[byte % characters.length]).join('');
  }

  /**
 * Validate an email address.
 * @param email - The email address to validate.
 * @returns True if the email is valid, otherwise false.
 */
export function isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  /**
 * Convert an object to FormData.
 * @param obj - The object to convert.
 * @returns A FormData object.
 */
export function objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
      formData.append(key, obj[key]);
    });
    return formData;
  }

  /**
 * Convert an array of key-value pairs into an object.
 * @param arr - The array to convert. Each element should be a tuple [key, value].
 * @returns The resulting object.
 */
export function arrayToObject<T>(arr: [string, T][]): Record<string, T> {
    return arr.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as Record<string, T>);
  }

  /**
 * Convert an object into an array of key-value pairs.
 * @param obj - The object to convert.
 * @returns The resulting array of tuples [key, value].
 */
export function objectToArray<T>(obj: Record<string, T>): [string, T][] {
    return Object.entries(obj);
  }
  