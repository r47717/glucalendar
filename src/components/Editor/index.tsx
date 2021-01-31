import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

type Props = {
  content: string;
  onBlur: (value: string) => void;
};

function Editor({ content, onBlur }: Props) {
  const [value, setValue] = useState<string>(content);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <textarea
      ref={ref}
      className={styles.editor}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
      onBlur={() => onBlur(value)}
    />
  );
}

export default Editor;
