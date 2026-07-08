import React from "react";
import CrudListPage from "../../components/admin/CrudListPage";
import { Field, TextInput, TextArea } from "../../components/admin/AdminUI";
import { greetingsApi } from "../../utils/contentApi";

export default function GreetingsPage() {
  return (
    <CrudListPage
      icon="💌"
      title="Greetings"
      subtitle="THE 26 BIRTHDAY GREETING CARDS"
      api={greetingsApi}
      itemLabel="greeting"
      emptyIcon="💌"
      newItemDefaults={{ emoji: "🌸", title: "", message: "", sortOrder: 0 }}
      renderItem={(item) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.emoji}</span>
          <div>
            <p
              style={{
                fontFamily: "'Great Vibes',cursive",
                fontSize: 18,
                color: "#FF4D8D",
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 13,
                color: "#a09098",
              }}
            >
              {item.message}
            </p>
          </div>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="EMOJI">
            <TextInput
              value={item.emoji}
              onChange={(v) => onChange({ emoji: v })}
              placeholder="🌸"
            />
          </Field>
          <Field label="TITLE">
            <TextInput
              value={item.title}
              onChange={(v) => onChange({ title: v })}
              placeholder="Forever Wonderful"
            />
          </Field>
          <Field label="MESSAGE">
            <TextArea
              value={item.message}
              onChange={(v) => onChange({ message: v })}
              placeholder="May today be as beautiful as your smile..."
            />
          </Field>
        </>
      )}
    />
  );
}
