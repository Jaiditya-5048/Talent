 return (
                                    <InputComponent
                                        key={field.name}
                                        placeholder={
                                            field.placeholder ??
                                            (field.type === 'date'
                                                ? field.label
                                                : `Enter ${field.label}`)
                                        }
                                        value={state[field.name]}
                                        error={error[field.name]}
                                        onChangeInput={handleInputChangeEvent}
                                        onKeyDown={handleKeyDownEvent}
                                        {...field}
                                    />
                                );