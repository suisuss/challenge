export const checkNoticeEditPermission = (
  status: number,
  role: string,
  authorId: number,
  userId: number
): boolean => {
  if (role === 'admin') {
    return authorId === userId;
  }

  switch (status) {
    case 1:
    case 2:
    case 3:
    case 5:
      return authorId === userId;
    default:
      return false;
  }
};

export const checkNoticeApprovePermission = (status: number, role: string): boolean => {
  if (role === 'admin') {
    switch (status) {
      case 2:
      case 3:
        return true;
      default:
        return false;
    }
  }

  return false;
};

export const checkNoticeRejectPermission = (status: number, role: string): boolean => {
  if (role === 'admin') {
    switch (status) {
      case 2:
      case 3:
        return true;
      default:
        return false;
    }
  }

  return false;
};

export const checkNoticeDeletePermission = (
  status: number,
  role: string,
  authorId: number,
  userId: number
): boolean => {
  if (role === 'admin') {
    switch (status) {
      case 1:
      case 6:
        return false;
      default:
        return true;
    }
  }

  return authorId === userId;
};
