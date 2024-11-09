export const getDividerLabel = (createdAt: string): string => {
  if (
    createdAt.includes('hours ago') || 
    createdAt.includes('hour ago') || 
    createdAt.includes('minutes ago') || 
    createdAt.includes('Just now')
  ) {
    return "Aujourd'hui";
  } else if (createdAt.includes('yesterday')) {
    return 'Hier';
  } else if (createdAt.includes('days ago')) {
    const days = parseInt(createdAt.split(' ')[0], 10);
    if (days === 1) {
      return 'Hier';
    } else if (days < 7) {
      return `${days} jours avant`;
    } else if (days >= 7 && days < 14) {
      return 'Il y a 1 semaine';
    } else if (days >= 14 && days < 30) {
      const weeks = Math.floor(days / 7);
      return `Il y a ${weeks} semaines`;
    } else if (days >= 30 && days < 365) {
      const months = Math.floor(days / 30);
      return months === 1 ? 'Il y a 1 mois' : `Il y a ${months} mois`;
    } else if (days >= 365) {
      const years = Math.floor(days / 365);
      return years === 1 ? 'Il y a 1 an' : `Il y a ${years} ans`;
    }
  } else {
    return createdAt;
  }
};

  
  export const shouldDisplayDateDivider = (currentMessageDate: string, previousMessageDate?: string): boolean => {
    if (!previousMessageDate) return true;
    return currentMessageDate !== previousMessageDate;
  };
  
  export const scrollToBottom = (chatEndRef: React.RefObject<HTMLDivElement>) => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
export const copyToClipboard = (
    textToCopy: string,
    index: number,
    setCopiedIndex: (index: number | null) => void
  ) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };
  