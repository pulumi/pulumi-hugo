package main

import (
	"embed"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/Masterminds/sprig/v3"
)

//go:embed examples
var examples embed.FS

const indexTemplate = `---
title: Slot Machine
meta_desc: Spin the Pulumi slot machine to get a real world code example using a random language, cloud, and application.
type: page
layout: slot-machine

examples:
{{- range .}}
  - key: {{.Key}}
    language: {{.Language}}
    code: |
{{ .Code | indent 6 }}
{{- end }}
---
`

type Example struct {
	Key      string
	Language string
	Code     string
}

func main() {
	files, err := examples.ReadDir("examples")
	if err != nil {
		panic(err)
	}
	var examplesData []Example
	for _, f := range files {
		code, err := examples.ReadFile(filepath.Join("examples", f.Name()))
		if err != nil {
			panic(err)
		}
		key := strings.TrimSuffix(f.Name(), filepath.Ext(f.Name()))
		lang := strings.SplitN(f.Name(), "-", 2)[0]
		examplesData = append(examplesData, Example{
			Key:      key,
			Language: lang,
			Code:     string(code),
		})
	}
	t := template.Must(template.New("index").Funcs(sprig.FuncMap()).Parse(indexTemplate))
	f, err := os.OpenFile("_index.md", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	err = t.Execute(f, examplesData)
	if err != nil {
		panic(err)
	}
}
