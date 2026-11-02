"use client";

import { useEffect, useState } from "react";
import { IconSend } from "@tabler/icons-react";

import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/base/input/input-group";
import { Label } from "@/components/base/input/label";

type CodeDeliveryInputProps = {
  id: string;
  label: string;
  type: "email" | "tel";
  value: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  canSend?: boolean;
  cooldownSeconds?: number;
  sendLabel: string;
  resendLabel: string;
  countdownLabel: (seconds: number) => string;
  onValueChange: (value: string) => void;
  onSend: (value: string) => void;
};

function CodeDeliveryInput({
  id,
  label,
  type,
  value,
  placeholder,
  autoComplete,
  disabled = false,
  canSend = true,
  cooldownSeconds = 60,
  sendLabel,
  resendLabel,
  countdownLabel,
  onValueChange,
  onSend,
}: CodeDeliveryInputProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [hasSent, setHasSent] = useState(false);

  useEffect(() => {
    if (secondsRemaining === 0) return;
    const timer = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsRemaining]);

  const sendingDisabled = disabled || !canSend || secondsRemaining > 0;
  const buttonLabel = secondsRemaining > 0 ? countdownLabel(secondsRemaining) : hasSent ? resendLabel : sendLabel;

  function sendCode() {
    if (sendingDisabled) return;
    onSend(value);
    setHasSent(true);
    setSecondsRemaining(cooldownSeconds);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <InputGroup className="h-10">
        <InputGroupInput
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          disabled={disabled}
        />
        <InputGroupButton
          size="sm"
          className="mr-1.5"
          disabled={sendingDisabled}
          aria-label={buttonLabel}
          title={buttonLabel}
          onClick={sendCode}
        >
          <IconSend aria-hidden="true" />
          <span>{secondsRemaining > 0 ? `${secondsRemaining}s` : hasSent ? resendLabel : sendLabel}</span>
        </InputGroupButton>
      </InputGroup>
    </div>
  );
}

export { CodeDeliveryInput, type CodeDeliveryInputProps };
