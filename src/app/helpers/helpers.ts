export const log = (...args: any[]) => <T>(data: T): T => {
    console.log.apply(null, args.concat([data]));
    return data;
  };
