"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import OnboardingModal from "@/components/OnboardingModal";

export default function OnboardingGate() {
  const { profile, loading } = useUserProfile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    // show modal when logged in & no role yet
    if (profile && !profile.role) setOpen(true);
    else setOpen(false);
  }, [profile, loading]);

  return <OnboardingModal open={open} onClose={() => setOpen(false)} />;
}
