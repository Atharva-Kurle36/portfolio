"use client";

import React, { useState } from "react";
import { serverContacts } from "@/data/profile";
import { ServerContact } from "@/types";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const ServerList: React.FC = () => {
  const [selectedServer, setSelectedServer] = useState<ServerContact>(serverContacts[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDirectConnect, setShowDirectConnect] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSent, setFormSent] = useState(false);
  const { playPop, playClick, playLevelUp } = useSoundEffects();

  const handleSelect = (server: ServerContact) => {
    playPop();
    setSelectedServer(server);
  };

  const handleJoin = (server: ServerContact) => {
    playClick();
    if (server.type === "email") {
      setShowDirectConnect(true);
    } else {
      window.open(server.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = (server: ServerContact, e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(server.address);
    setCopiedId(server.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    playLevelUp();
    setFormSent(true);

    // Open mailto fallback
    const subject = encodeURIComponent(`Portfolio Message from ${senderName || "Visitor"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${senderName} (${senderEmail})`);
    window.location.href = `mailto:kurleatharva2007@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormSent(false);
      setShowDirectConnect(false);
      setMessage("");
      setSenderName("");
      setSenderEmail("");
    }, 3000);
  };

  return (
    <section
      id="contact"
      aria-label="Multiplayer Server List and Contact"
      className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative select-none overflow-hidden"
    >
      {/* Background Portal Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/minecraft_portal.jpg')",
          imageRendering: "pixelated",
        }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="server" size={24} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Play Multiplayer (Contact)
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-6 text-center max-w-md">
          Connect to Atharva&apos;s realms, send direct packets, or copy server IPs.
        </p>

        {/* Server List Container */}
        <div className="w-full max-w-3xl bg-[#0e0e11]/90 border-4 border-[#3a3b42] p-2 sm:p-3 shadow-2xl">
          <div className="space-y-2">
            {serverContacts.map((server) => {
              const isSelected = selectedServer?.id === server.id;

              return (
                <div
                  key={server.id}
                  onClick={() => handleSelect(server)}
                  onDoubleClick={() => handleJoin(server)}
                  className={`
                    flex items-start gap-3 p-3 transition-all cursor-pointer border-2
                    ${
                      isSelected
                        ? "bg-[#252830] border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        : "bg-[#18191e] hover:bg-[#202127] border-[#2b2d35]"
                    }
                  `}
                >
                  {/* Server Icon */}
                  <div className="shrink-0 w-12 h-12 bg-[#2c2d35] border-2 border-t-[#454752] border-l-[#454752] border-b-[#15161a] border-r-[#15161a] flex items-center justify-center">
                    <PixelIcon name={server.icon} size={28} />
                  </div>

                  {/* Server Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-minecraft text-xs sm:text-sm font-bold text-white truncate">
                        {server.name}
                      </h3>

                      {/* Ping Bars */}
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-minecraft text-[9px] text-[#4ade80]">
                          {server.ping}ms
                        </span>
                        {/* 5-bar signal */}
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-1 h-1 bg-[#22c55e]" />
                          <span className="w-1 h-1.5 bg-[#22c55e]" />
                          <span className="w-1 h-2 bg-[#22c55e]" />
                          <span className="w-1 h-2.5 bg-[#22c55e]" />
                          <span className="w-1 h-3 bg-[#22c55e]" />
                        </div>
                      </div>
                    </div>

                    <div className="font-minecraft text-[10px] text-[#38bdf8] truncate mt-0.5">
                      {server.address}
                    </div>

                    <p className="font-sans text-xs text-[#a1a1aa] mt-1 line-clamp-1">
                      {server.motd}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={(e) => handleCopy(server, e)}
                    title="Copy server address"
                    className="self-center px-2 py-1 font-minecraft text-[9px] bg-[#373942] hover:bg-[#4a4d59] text-white border border-[#5a5e6d] active:translate-y-[1px] cursor-pointer shrink-0"
                  >
                    {copiedId === server.id ? "Copied!" : "Copy IP"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="w-full max-w-3xl mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <MinecraftButton
            size="md"
            variant="primary"
            onClick={() => handleJoin(selectedServer)}
          >
            Join Server
          </MinecraftButton>

          <MinecraftButton
            size="md"
            variant="default"
            onClick={() => {
              playClick();
              setShowDirectConnect(true);
            }}
          >
            Direct Connect (Form)
          </MinecraftButton>

          <MinecraftButton
            size="md"
            variant="dark"
            onClick={() => {
              playPop();
              navigator.clipboard.writeText("atharvakurle.dev@gmail.com");
              setCopiedId("email");
              setTimeout(() => setCopiedId(null), 2500);
            }}
          >
            {copiedId === "email" ? "Email Copied!" : "Copy Atharva's Email"}
          </MinecraftButton>
        </div>

        {/* Direct Connect Modal */}
        {showDirectConnect && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none"
            onClick={() => setShowDirectConnect(false)}
          >
            <div
              className="w-full max-w-md bg-[#c6c6c6] p-6 border-4 border-[#ffffff] border-b-4 border-r-4 border-b-[#555555] border-r-[#555555] shadow-2xl relative text-[#222222]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-[#8b8b8b] pb-3 mb-4">
                <div className="font-minecraft text-sm font-bold text-[#1f2937]">
                  Direct Connect: Message Atharva
                </div>
                <button
                  type="button"
                  onClick={() => setShowDirectConnect(false)}
                  className="w-7 h-7 bg-[#8b8b8b] hover:bg-[#a0a0a0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#373737] border-r-[#373737] flex items-center justify-center text-white cursor-pointer"
                >
                  <PixelIcon name="close" size={12} />
                </button>
              </div>

              {formSent ? (
                <div className="p-6 bg-[#22c55e]/10 border-2 border-[#22c55e] text-center space-y-2">
                  <div className="font-minecraft text-sm text-[#15803d]">
                    Packet Transmitted!
                  </div>
                  <p className="font-sans text-xs text-[#166534]">
                    Opening your mail client to dispatch the message to Atharva.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div>
                    <label className="block font-minecraft text-[10px] text-[#374151] mb-1">
                      Player Name
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Steve / Recruiter"
                      className="w-full px-3 py-2 bg-[#ffffff] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-minecraft text-[10px] text-[#374151] mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. contact@company.com"
                      className="w-full px-3 py-2 bg-[#ffffff] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-minecraft text-[10px] text-[#374151] mb-1">
                      Server Message / Note
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Atharva, let's discuss an internship or software project..."
                      className="w-full px-3 py-2 bg-[#ffffff] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <MinecraftButton
                      size="sm"
                      variant="dark"
                      type="button"
                      onClick={() => setShowDirectConnect(false)}
                    >
                      Cancel
                    </MinecraftButton>
                    <MinecraftButton size="sm" variant="primary" type="submit">
                      Transmit Packet
                    </MinecraftButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
